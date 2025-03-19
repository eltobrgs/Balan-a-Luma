# LUMAK BALANÇAS - Aplicativo Web/Mobile

Este é um aplicativo web progressivo (PWA) para controle de balança via Bluetooth BLE.

## Funcionalidades

- Conexão com balança via Bluetooth BLE
- Leitura em tempo real do peso
- Salvamento de dados com identificação do animal
- Interface responsiva para web e mobile
- Funciona offline
- Instalável como aplicativo mobile

## Requisitos

- Navegador com suporte a Web Bluetooth API (Chrome, Edge, Opera)
- Dispositivo com Bluetooth 4.0 ou superior
- ESP32 configurado com o firmware correto

## Como Usar

1. Abra o aplicativo em um navegador compatível
2. Clique em "Conectar" para buscar dispositivos BLE
3. Selecione a balança na lista de dispositivos
4. Após conectado, você verá as leituras de peso em tempo real
5. Para salvar uma medição, digite o número do brinco/identificação do animal e clique em "Salvar"

## Instalação como Aplicativo Mobile

1. Abra o aplicativo no Chrome/Edge em seu dispositivo móvel
2. Aguarde o prompt de instalação ou
3. No menu do navegador, selecione "Adicionar à tela inicial"

## Desenvolvimento

O aplicativo foi desenvolvido usando:
- HTML5
- CSS3 com variáveis e flexbox
- JavaScript moderno com Web Bluetooth API
- PWA para funcionalidades offline e instalação

## Compatibilidade

- Android: Chrome 56+
- iOS: Não suporta Web Bluetooth
- Desktop: Chrome 56+, Edge 79+, Opera 43+

## Problemas Conhecidos

- iOS não suporta Web Bluetooth API
- Alguns navegadores podem requerer flags específicas para Web Bluetooth
- Em alguns dispositivos Android, pode ser necessário ativar a localização para usar Bluetooth

## Suporte

Para problemas ou sugestões, entre em contato com o suporte técnico da LUMAK. # Balan-a-Luma
