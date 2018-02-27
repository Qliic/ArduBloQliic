#include <Arduino.h>
#line 1
#line 1 "/home/francois/Program/ardublockly/ardublockly_v1/ArdublocklySketch/ArdublocklySketch.ino"
// Describe this function...
#line 2 "/home/francois/Program/ardublockly/ardublockly_v1/ArdublocklySketch/ArdublocklySketch.ino"
void do_something();
#line 14 "/home/francois/Program/ardublockly/ardublockly_v1/ArdublocklySketch/ArdublocklySketch.ino"
void setup();
#line 18 "/home/francois/Program/ardublockly/ardublockly_v1/ArdublocklySketch/ArdublocklySketch.ino"
void loop();
#line 2
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
