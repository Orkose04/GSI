#include <ESP8266WiFi.h>

const char* server = "gsi_server";
const char* pswd = "gsi00001";
bool isConnected = false;
const int id=1;

// La broche LED sur Wemos est souvent définie par LED_BUILTIN
void setup() {
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT); // Initialise la broche LED comme sortie
  WiFi.disconnect();
  WiFiServer server(80);
}

void loop() {
  if (!isConnected) {
    displayNetworks();
    if (testConnection()) {
      isConnected = true;
      Serial.println("Connected device\n");
      digitalWrite(LED_BUILTIN, LOW); // Allume la LED (peut être HIGH sur certaines cartes)
      checkHTTP();
    } else {
      Serial.println("Connection Failed!\n");
      digitalWrite(LED_BUILTIN, HIGH); // Éteint la LED
    }
  } else if (WiFi.status() != WL_CONNECTED) {
    isConnected = false;
    digitalWrite(LED_BUILTIN, HIGH); // Éteint la LED si la connexion est perdue
  }
  delay(10000); // Attente de 10 secondes avant de scanner à nouveau
}

void displayNetworks() {
  int n = WiFi.scanNetworks();
  Serial.println();
  if (n == 0) {
    Serial.println("No networks found");
  } else {
    Serial.print(n);
    Serial.println(" networks found");
    for (int i = 0; i < n; ++i) {
      Serial.print(i + 1);
      Serial.print(": ");
      Serial.print(WiFi.SSID(i));
      Serial.print(" (");
      Serial.print(WiFi.RSSI(i));
      Serial.println(")");
    }
  }
}

bool testConnection() {
  const unsigned long timeout = 5000; // Temps limite de 5 secondes
  unsigned long startAttemptTime = millis();
  WiFi.begin(server, pswd);
  while (WiFi.status() != WL_CONNECTED && millis() - startAttemptTime < timeout) {
    delay(100);
  }
  return WiFi.status() == WL_CONNECTED;
}

void checkHTTP() {

  WiFiClient client;
  
  Serial.println("Connecté au WiFi");
  Serial.print("Adresse IP locale: ");
  Serial.println(WiFi.localIP());

  // Créez un objet IPAddress pour l'adresse IP locale
  IPAddress localIP = WiFi.localIP();
  
  // Modifiez le dernier octet de l'adresse IP
  localIP[3] = 1; // Remplacez 100 par le chiffre souhaité

  // Affichez la nouvelle adresse IP
  Serial.print("Adresse IP de l'hôte: ");
  Serial.println(localIP);

  if (!client.connect(localIP, 5000)) {
    Serial.println("Connexion echouee");
    return;
  }

  // Envoi de la requête HTTP
  String url = "/gsi/check/?id="+String(id);
  Serial.print("Demande de l'URL: ");
  Serial.println(url);
  
  client.print(String("GET ") + url + " HTTP/1.1\r\n" +
               "Host: " + localIP.toString() + "\r\n" + 
               "Connection: close\r\n\r\n");

}
