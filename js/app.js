// Constantes
const SERVICE_UUID = "12345678-1234-5678-1234-56789abcdef0";
const CHARACTERISTIC_UUID = "87654321-4321-8765-4321-abcdef987654";

// Variáveis globais
let bleDevice = null;
let bleServer = null;
let bleCharacteristic = null;

// Elementos da UI
const statusText = document.getElementById('statusText');
const deviceSelect = document.getElementById('deviceSelect');
const connectBtn = document.getElementById('connectBtn');
const weightValue = document.getElementById('weightValue');
const bluetoothStatus = document.getElementById('bluetoothStatus');
const braceletInput = document.getElementById('braceletInput');
const savedData = document.getElementById('savedData');

// Funções de navegação
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// Funções BLE
async function scanDevices() {
    try {
        statusText.textContent = '🔎 Escaneando dispositivos BLE...';
        deviceSelect.innerHTML = '<option value="">Selecione um dispositivo</option>';
        deviceSelect.disabled = true;
        connectBtn.disabled = true;

        const devices = await navigator.bluetooth.requestDevice({
            filters: [{
                services: [SERVICE_UUID]
            }],
            optionalServices: [SERVICE_UUID]
        });

        deviceSelect.disabled = false;
        const option = document.createElement('option');
        option.value = devices.id;
        option.textContent = devices.name || 'Dispositivo Desconhecido';
        deviceSelect.appendChild(option);
        deviceSelect.value = devices.id;
        connectBtn.disabled = false;
        bleDevice = devices;

        statusText.textContent = '📡 Dispositivo encontrado. Clique em Conectar.';
    } catch (error) {
        console.error('Erro ao escanear:', error);
        statusText.textContent = '⚠️ Erro ao escanear dispositivos: ' + error.message;
    }
}

async function connectToDevice() {
    try {
        statusText.textContent = '🔗 Conectando...';
        connectBtn.disabled = true;

        bleServer = await bleDevice.gatt.connect();
        const service = await bleServer.getPrimaryService(SERVICE_UUID);
        bleCharacteristic = await service.getCharacteristic(CHARACTERISTIC_UUID);

        // Configurar notificações
        await bleCharacteristic.startNotifications();
        bleCharacteristic.addEventListener('characteristicvaluechanged', handleWeightData);

        statusText.textContent = '✅ Conectado!';
        bluetoothStatus.classList.add('connected');
        showPage('scalePage');
    } catch (error) {
        console.error('Erro ao conectar:', error);
        statusText.textContent = '⚠️ Erro ao conectar: ' + error.message;
        connectBtn.disabled = false;
    }
}

function handleWeightData(event) {
    const value = new TextDecoder().decode(event.target.value);
    weightValue.textContent = `📊 Peso: ${value} Kg`;
}

async function disconnect() {
    if (bleDevice && bleDevice.gatt.connected) {
        await bleDevice.gatt.disconnect();
    }
    bleDevice = null;
    bleServer = null;
    bleCharacteristic = null;
    bluetoothStatus.classList.remove('connected');
    weightValue.textContent = 'Aguardando dados...';
    showPage('homePage');
}

// Funções de dados
function saveData() {
    const bracelet = braceletInput.value;
    const weight = weightValue.textContent;
    
    if (bracelet && weight !== 'Aguardando dados...') {
        const data = `${bracelet}: ${weight}`;
        const dataElement = document.createElement('div');
        dataElement.textContent = data;
        savedData.appendChild(dataElement);
        
        // Salvar no localStorage
        const savedMeasurements = JSON.parse(localStorage.getItem('measurements') || '[]');
        savedMeasurements.push({
            bracelet,
            weight,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('measurements', JSON.stringify(savedMeasurements));
        
        braceletInput.value = '';
    } else {
        alert('Por favor, preencha o número do brinco e aguarde uma leitura válida.');
    }
}

// Verificar suporte a Web Bluetooth
if (!navigator.bluetooth) {
    alert('Web Bluetooth não é suportado neste navegador. Por favor, use um navegador compatível como Chrome ou Edge.');
}

// Carregar dados salvos ao iniciar
function loadSavedData() {
    const savedMeasurements = JSON.parse(localStorage.getItem('measurements') || '[]');
    savedData.innerHTML = '';
    savedMeasurements.forEach(measurement => {
        const dataElement = document.createElement('div');
        dataElement.textContent = `${measurement.bracelet}: ${measurement.weight}`;
        savedData.appendChild(dataElement);
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    loadSavedData();
}); 