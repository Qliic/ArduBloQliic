// Describe this function...
void do_something() {
  digitalWrite(13, HIGH);
  delay(200);
  digitalWrite(13, LOW);
  delay(200);
  digitalWrite(13, HIGH);
  delay(100);
  digitalWrite(13, LOW);
  delay(100);
}


void setup() {
  pinMode(13, OUTPUT);
}

void loop() {
  do_something();

}