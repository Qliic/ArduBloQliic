#include <Arduino.h>
#line 1
#line 1 "/home/francois/Arduino/temp/temp.ino"
#include <Adafruit_NeoPixel.h>
Adafruit_NeoPixel pixel_8 = Adafruit_NeoPixel(1, 8, NEO_GRB + NEO_KHZ800);
#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C LCD(39,16,2);

int v0;

#line 8 "/home/francois/Arduino/temp/temp.ino"
void setup();
#line 16 "/home/francois/Arduino/temp/temp.ino"
void loop();
#line 8
void setup() {
  Serial.begin(9600);
  pinMode(A0, INPUT);
  pixel_8.begin();
  LCD.init();
  LCD.backlight();
}

void loop() {

  char inByte;
  
  v0 = (int)(analogRead(A0) / 4);
  pixel_8.setPixelColor(0, pixel_8.Color((int) inByte,(int) inByte,(int) inByte));
  pixel_8.show();
  LCD.setCursor(0,0);
  LCD.print(v0);

  if (Serial.available()) {
    inByte = Serial.read();
    LCD.setCursor(0,1);
    LCD.print("CAR=");
    LCD.print(inByte);
  }
}

