#include <ESP8266WiFi.h>

const char* server = "gsi_server";
const char* pswd = "gsi00001";
bool isConnected = false;
const int id = 2;
unsigned long previousMillis = 0; 
const long interval = 5000; 

void setup() {
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT); 
  WiFi.persistent(true);
  WiFi.setAutoReconnect(true);
  WiFi.begin(server, pswd);
}

void loop() {
  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;
    if (WiFi.status() != WL_CONNECTED) {
      isConnected = false;
      digitalWrite(LED_BUILTIN, HIGH); 
    } else {
      if (!isConnected) {
        isConnected = true;
        Serial.println("Connected device\n");
        digitalWrite(LED_BUILTIN, LOW); 
        checkHTTP();
      }
    }
  }
}

void checkHTTP() {
  WiFiClient client;
  IPAddress localIP = WiFi.localIP();
  localIP[3] = 1; 

  if (!client.connect(localIP, 5000)) {
    Serial.println("Connexion echouee");
    return;
  }

  String url = "/gsi/check/?id=" + String(id) ;
  client.print(String("GET ") + url + " HTTP/1.1\r\n" +
               "Host: " + localIP.toString() + "\r\n" + 
               "Connection: close\r\n\r\n");
}
