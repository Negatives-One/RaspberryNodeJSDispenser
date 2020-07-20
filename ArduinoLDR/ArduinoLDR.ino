int luz;
void setup() {
  Serial.begin(9600);
  pinMode(A1, INPUT);
}

void loop() {
  luz = analogRead(A1);
  Serial.println(luz);
}
