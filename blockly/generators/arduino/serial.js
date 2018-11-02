/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Code generator for the Arduino serial blocks.
 *     Arduino Serial library docs: https://www.arduino.cc/en/Reference/Serial
 *
 * TODO: There are more functions that can be added:
 *       http://arduino.cc/en/Reference/Serial
 */
'use strict';

goog.provide('Blockly.Arduino.serial');

goog.require('Blockly.Arduino');


/**
 * Code generator of block for writing to the serial com.
 * Arduino code: loop { Serial.print(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['serial_print'] = function(block) {
  var serialId = block.getFieldValue('SERIAL_ID');
  var content = Blockly.Arduino.valueToCode(
      block, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var checkbox_name = (block.getFieldValue('NEW_LINE') == 'TRUE');

  var serialPins = Blockly.Arduino.Boards.selected.serialPins[serialId];
  for (var i = 0; i < serialPins.length; i++) {
    Blockly.Arduino.reservePin(block, serialPins[i][1],
        Blockly.Arduino.PinTypes.SERIAL, 'SERIAL ' + serialPins[i][0]);
  }

  if (checkbox_name) {
    var code = serialId + '.println(' + content + ');\n';
  } else {
    var code = serialId + '.print(' + content + ');\n';
  }
  return code;
};

/**
 * Code generator for block for setting the serial com speed.
 * Arduino code: setup{ Serial.begin(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code.
 */
Blockly.Arduino['serial_setup'] = function(block) {
  var serialId = block.getFieldValue('SERIAL_ID');
  var serialSpeed = block.getFieldValue('SPEED');
  var serialSetupCode = serialId + '.begin(' + serialSpeed + ');';
  Blockly.Arduino.addSetup('serial_' + serialId, serialSetupCode, true);
  var code = '';
  return code;
};

// qliic_serial_setup

Blockly.Arduino['qliic_serial_setup'] = function(block) {
  var serialId = block.getFieldValue('SERIAL_ID');
  var serialSpeed = block.getFieldValue('SPEED');
  var serialSetupCode = serialId + '.begin(' + serialSpeed + ');';
  Blockly.Arduino.addSetup('serial_' + serialId, serialSetupCode, true);

  if (serialId === 'Bluetooth') {
    Blockly.Arduino.addInclude('bluetooth_1', '#include <SoftwareSerial.h>');
    Blockly.Arduino.addInclude('bluetooth_2', 'SoftwareSerial Bluetooth(2,3); // RX->TX, TX->RX');
  }

  var code = '';
  return code;
};

Blockly.Arduino['qliic_print'] = function(block) {
  var serialId = block.getFieldValue('SERIAL_ID');
  var content = Blockly.Arduino.valueToCode(
      block, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var checkbox_name = (block.getFieldValue('NEW_LINE') == 'TRUE');

  if (checkbox_name) {
    var code = serialId + '.println(' + content + ');\n';
  } else {
    var code = serialId + '.print(' + content + ');\n';
  }
  return code;
};

//Qliic Scan I2C

Blockly.Arduino['qliic_i2c_scan'] = function(block) {
  Blockly.Arduino.addInclude('wire', '#include <Wire.h>');
  Blockly.Arduino.addInclude('qliic_i2c_scan', '#include <QliicScan.h>');
  Blockly.Arduino.addSetup('qliic_i2c_scan', 'setupDetecterI2C();', true);
  var code = 'detecterI2C();\n';
  return code;
};

//qliic_wire

/**
 * Code generator for block for setting the serial com speed.
 * Arduino code: setup{ Serial.begin(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code.
 */
Blockly.Arduino['wire_setup'] = function(block) {
  Blockly.Arduino.addInclude('wire', '#include <Wire.h>');
  Blockly.Arduino.addSetup('wire', 'Wire.begin();', true);
  var code = '';
  return code;
};

/**
 * Code generator for block for setting the serial com speed.
 * Arduino code: setup{ Serial.begin(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code.
 */
Blockly.Arduino['wire_request'] = function(block) {
  Blockly.Arduino.addInclude('wire', '#include <Wire.h>');
  Blockly.Arduino.addSetup('wire', 'Wire.begin();', true);
  var quantity = Blockly.Arduino.valueToCode(
      block, 'NUMBER', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var adress = Blockly.Arduino.valueToCode(
          block, 'ADRESS', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = 'Wire.requestFrom('+adress+','+quantity+',true);\n';
  return code;
};

/**
 * Code generator for block for setting the serial com speed.
 * Arduino code: setup{ Serial.begin(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code.
 */
Blockly.Arduino['wire_begin'] = function(block) {
  Blockly.Arduino.addInclude('wire', '#include <Wire.h>');
  Blockly.Arduino.addSetup('wire', 'Wire.begin();', true);
  var content = Blockly.Arduino.valueToCode(
      block, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = 'Wire.beginTransmission('+content+');\n';
  return code;
};

/**
 * Code generator for block for setting the serial com speed.
 * Arduino code: setup{ Serial.begin(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code.
 */
Blockly.Arduino['wire_end'] = function(block) {
  Blockly.Arduino.addInclude('wire', '#include <Wire.h>');
  Blockly.Arduino.addSetup('wire', 'Wire.begin();', true);
  var code = 'Wire.endTransmission()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * Code generator for block for setting the serial com speed.
 * Arduino code: setup{ Serial.begin(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code.
 */
Blockly.Arduino['wire_write'] = function(block) {
  Blockly.Arduino.addInclude('wire', '#include <Wire.h>');
  Blockly.Arduino.addSetup('wire', 'Wire.begin();', true);
  var content = Blockly.Arduino.valueToCode(
      block, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = 'Wire.write('+content+');\n';
  return code;
};

/**
 * Code generator for block for setting the serial com speed.
 * Arduino code: setup{ Serial.begin(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code.
 */
Blockly.Arduino['wire_read'] = function(block) {
  Blockly.Arduino.addInclude('wire', '#include <Wire.h>');
  Blockly.Arduino.addSetup('wire', 'Wire.begin();', true);
  var code = 'Wire.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * Code generator for block for setting the serial com speed.
 * Arduino code: setup{ Serial.begin(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code.
 */
Blockly.Arduino['wire_available'] = function(block) {
  Blockly.Arduino.addInclude('wire', '#include <Wire.h>');
  Blockly.Arduino.addSetup('wire', 'Wire.begin();', true);
  var code = 'Wire.available()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// Qliic setup_loop

Blockly.Arduino['qliic_setup'] = function(block) {
  Blockly.Arduino.addSetup('setup', 'setup.begin();', true);
  var code = '';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['qliic_loop'] = function(block) {
  Blockly.Arduino.addSetup('loop', 'loop.begin();', true);
  var code = '';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// Qliic sensor (distance, analog, compass)

Blockly.Arduino['qliic_distance_read'] = function(block) {
  Blockly.Arduino.addInclude('distance', '#include <QliicDistance.h>');
  Blockly.Arduino.addSetup('distance', 'QliicDistanceSetup();', true);
  var code = 'ReadDistance()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['qliic_analog_read'] = function(block) {
  Blockly.Arduino.addInclude('analog', '#include <QliicAnalog.h>');
  Blockly.Arduino.addSetup('analog', 'QliicAnalogSetup();', true);
  var code = 'ReadAnalogInput()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['qliic_magnenometer_read'] = function(block) {
  Blockly.Arduino.addInclude('magnetometer1', 'boolean magnetometer = false;');
  Blockly.Arduino.addInclude('magnetometer2', 'int magnetometerAxeX, magnetometerAxeY, magnetometerAxeZ, magnetometerDegre;');
  Blockly.Arduino.addInclude('magnetometer3', '#include <QliicMagnetometer.h>');

  Blockly.Arduino.addSetup('compass', 'magnetometerSetup();', true);
  var code = 'magnetometerRead()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['qliic_magnenometer_value'] = function(block) {
  var magnetometerId = block.getFieldValue('MAGNETOMETER_ID');
  var code = magnetometerId;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['qliic_gyroscope_read'] = function(block) {
  Blockly.Arduino.addInclude('magnetometer1', 'boolean magnetometer = false;');
  Blockly.Arduino.addInclude('magnetometer2', 'int magnetometerAxeX, magnetometerAxeY, magnetometerAxeZ, magnetometerDegre;');
  Blockly.Arduino.addInclude('gyroscope', '#include <QliicGyroscope.h>');
  Blockly.Arduino.addSetup('gyroscope', 'QliicGyroscopeSetup();', true);
  var code = 'ReadGyroscopeAcceleration()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['qliic_gyroscope_value'] = function(block) {
  var magnetometerId = block.getFieldValue('MAGNETOMETER_ID');
  var code = magnetometerId;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['qliic_color_read'] = function(block) {
  Blockly.Arduino.addInclude('magnetometer1', 'boolean magnetometer = false;');
  Blockly.Arduino.addInclude('magnetometer2', 'int magnetometerAxeX, magnetometerAxeY, magnetometerAxeZ, magnetometerDegre;');
  Blockly.Arduino.addInclude('color', '#include <QliicColor.h>');
  Blockly.Arduino.addSetup('color', 'QliicColorSetup();', true);
  var code = 'ReadRGBColor()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['qliic_button_read'] = function(block) {
  var buttonId = block.getFieldValue('BUTTON_ID');
  Blockly.Arduino.addSetup('button', 'pinMode('+buttonId+', INPUT_PULLUP);', true);
  var code = '! digitalRead('+buttonId+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['qliic_infrared_read'] = function(block) {
  var buttonId = block.getFieldValue('BUTTON_ID');
  Blockly.Arduino.addSetup('infrared', 'pinMode('+buttonId+', INPUT);', true);
  var code = '! digitalRead('+buttonId+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// qliic_lcd

// qliic_lcd

Blockly.Arduino['qliic_lcd_setup'] = function(block) {
  //Blockly.Arduino.addInclude('i2c_scan1', '#include <Wire.h>');
  Blockly.Arduino.addInclude('lcd_1', '#include <LiquidCrystal_I2C.h>');
  Blockly.Arduino.addInclude('lcd_2', 'LiquidCrystal_I2C LCD(39,16,2);');
  Blockly.Arduino.addSetup('lcd_1', 'LCD.init();', true);
  Blockly.Arduino.addSetup('lcd_2', 'LCD.backlight();', true);
  var code = '';
  return code;
};

Blockly.Arduino['qliic_lcd_print'] = function(block) {
  Blockly.Arduino.addInclude('lcd_1', '#include <LiquidCrystal_I2C.h>');
  Blockly.Arduino.addInclude('lcd_2', 'LiquidCrystal_I2C LCD(39,16,2);');
  Blockly.Arduino.addSetup('lcd_1', 'LCD.init();', true);
  Blockly.Arduino.addSetup('lcd_2', 'LCD.backlight();', true);
  var content = Blockly.Arduino.valueToCode(
      block, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = 'LCD.print('+content+');\n';
  return code;
};

Blockly.Arduino['qliic_lcd_clear'] = function(block) {
  Blockly.Arduino.addInclude('lcd_1', '#include <LiquidCrystal_I2C.h>');
  Blockly.Arduino.addInclude('lcd_2', 'LiquidCrystal_I2C LCD(39,16,2);');
  Blockly.Arduino.addSetup('lcd_1', 'LCD.init();', true);
  Blockly.Arduino.addSetup('lcd_2', 'LCD.backlight();', true);
  var code = 'LCD.clear();\n';
  return code;
};

Blockly.Arduino['qliic_lcd_cursor'] = function(block) {
  Blockly.Arduino.addInclude('lcd_1', '#include <LiquidCrystal_I2C.h>');
  Blockly.Arduino.addInclude('lcd_2', 'LiquidCrystal_I2C LCD(39,16,2);');
  Blockly.Arduino.addSetup('lcd_1', 'LCD.init();', true);
  Blockly.Arduino.addSetup('lcd_2', 'LCD.backlight();', true);
  var contentx = Blockly.Arduino.valueToCode(
      block, 'CONTENTX', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var contenty = Blockly.Arduino.valueToCode(
      block, 'CONTENTY', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = 'LCD.setCursor('+contentx+','+contenty+');\n';
  return code;
};



Blockly.Arduino['qliic_tone_frequency'] = function(block) {
  var contentx = Blockly.Arduino.valueToCode(
      block, 'CONTENTX', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = 'tone(4,'+contentx+');\n';
  return code;
};

Blockly.Arduino['qliic_tone_note'] = function(block) {
  var contentx = Blockly.Arduino.valueToCode(
      block, 'CONTENTX', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var contenty = Blockly.Arduino.valueToCode(
      block, 'CONTENTY', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = 'tone(4,'+contentx+','+contenty+');\n';
  return code;
};

Blockly.Arduino['qliic_tone_silence'] = function(block) {
  var code = 'noTone(4);\n';
  return code;
};

Blockly.Arduino['qliic_rgb'] = function(block) {
  var pin = Blockly.Arduino.valueToCode(
      block, 'CONTENTP', Blockly.Arduino.ORDER_ATOMIC) || '0';
  Blockly.Arduino.addInclude('rgb_1', '#include <Adafruit_NeoPixel.h>');
  Blockly.Arduino.addInclude('rgb_'+pin, 'Adafruit_NeoPixel pixel_'+pin+' = Adafruit_NeoPixel(1, '+pin+', NEO_GRB + NEO_KHZ800);');
  Blockly.Arduino.addSetup('rgb_'+pin, 'pixel_'+pin+'.begin();', true);
  var contentp = Blockly.Arduino.valueToCode(
      block, 'CONTENTP', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var contentx = Blockly.Arduino.valueToCode(
      block, 'CONTENTX', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var contenty = Blockly.Arduino.valueToCode(
      block, 'CONTENTY', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var contentz = Blockly.Arduino.valueToCode(
      block, 'CONTENTZ', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = 'pixel_'+pin+'.setPixelColor(0, pixel_'+pin+'.Color('+contentx+','+contenty+','+contentz+'));\npixel_'+pin+'.show();\n';
  return code;
};
