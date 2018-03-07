/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks for the Arduino serial communication functions.
 *     The Arduino built in functions syntax can be found at:
 *     http://arduino.cc/en/Reference/HomePage
 *
 * TODO: There are more function that can be added:
 *       http://arduino.cc/en/Reference/Serial
 */
'use strict';

goog.provide('Blockly.Blocks.serial');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.serial.HUE = 160;

Blockly.Blocks['serial_setup'] = {
  /**
   * Block for setting the speed of the serial connection.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Serial/Begin');
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SERIAL_SETUP)
        .appendField(
            new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.serial), 'SERIAL_ID')
        .appendField(Blockly.Msg.ARD_SERIAL_SPEED)
        .appendField(
            new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.serialSpeed), 'SPEED')
        .appendField(Blockly.Msg.ARD_SERIAL_BPS);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.ARD_SERIAL_SETUP_TIP);
  },
  /**
   * Returns the serial instance name.
   * @return {!string} Serial instance name.
   * @this Blockly.Block
   */
  getSerialSetupInstance: function() {
    return this.getFieldValue('SERIAL_ID');
  },
  /**
   * Updates the content of the the serial related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SERIAL_ID', 'serial');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SPEED', 'serialSpeed');
  }
};

Blockly.Blocks['serial_print'] = {
  /**
   * Block for creating a write to serial com function.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://www.arduino.cc/en/Serial/Print');
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.serial), 'SERIAL_ID')
        .appendField(Blockly.Msg.ARD_SERIAL_PRINT);
    this.appendValueInput('CONTENT');
    this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox('TRUE'), 'NEW_LINE')
        .appendField(Blockly.Msg.ARD_SERIAL_PRINT_NEWLINE);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_SERIAL_PRINT_TIP);
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of serial_setup and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function(event) {
    if (!this.workspace || event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.UI) {
        return;  // Block deleted or irrelevant event
    }

    // Get the Serial instance from this block
    var thisInstanceName = this.getFieldValue('SERIAL_ID');
    // Iterate through top level blocks to find setup instance for the serial id
    var blocks = Blockly.mainWorkspace.getTopBlocks();
    var setupInstancePresent = false;
    for (var x = 0; x < blocks.length; x++) {
      var func = blocks[x].getSerialSetupInstance;
      if (func) {
        var setupBlockInstanceName = func.call(blocks[x]);
        if (thisInstanceName == setupBlockInstanceName) {
          setupInstancePresent = true;
          break;
        }
      }
    }

    if (!setupInstancePresent) {
      this.setWarningText(Blockly.Msg.ARD_SERIAL_PRINT_WARN.replace('%1',
          thisInstanceName), 'serial_setup');
    } else {
      this.setWarningText(null, 'serial_setup');
    }
  },
  /**
   * Updates the content of the the serial related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SERIAL_ID', 'serial');
  }
};

// Category qliic_communication
// qliic_serial_setup

Blockly.Blocks['qliic_serial_setup'] = {
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Serial/Begin');
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendDummyInput()
        .appendField('Setup')
        .appendField(
            new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.qliic_serial), 'SERIAL_ID')
        .appendField('speed to')
        .appendField(
            new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.qliic_serialSpeed), 'SPEED')
        .appendField('bps');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_SERIAL_SETUP_TIP);
  },
  /**
   * Returns the serial instance name.
   * @return {!string} Serial instance name.
   * @this Blockly.Block
   */
  getSerialSetupInstance: function() {
    return this.getFieldValue('SERIAL_ID');
  },
  /**
   * Updates the content of the the serial related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SERIAL_ID', 'serial');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SPEED', 'serialSpeed');
  }
};

Blockly.Blocks['qliic_print'] = {
  /**
   * Block for creating a write to serial com function.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://www.arduino.cc/en/Serial/Print');
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.qliic_serial), 'SERIAL_ID')
        .appendField(Blockly.Msg.ARD_SERIAL_PRINT);
    this.appendValueInput('CONTENT');
    this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox('TRUE'), 'NEW_LINE')
        .appendField(Blockly.Msg.ARD_SERIAL_PRINT_NEWLINE);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
//    this.setTooltip(Blockly.Msg.ARD_SERIAL_PRINT_TIP);
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of serial_setup and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function(event) {
    if (!this.workspace || event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.UI) {
        return;  // Block deleted or irrelevant event
    }

    // Get the Serial instance from this block
    var thisInstanceName = this.getFieldValue('SERIAL_ID');
    // Iterate through top level blocks to find setup instance for the serial id
    var blocks = Blockly.mainWorkspace.getTopBlocks();
    var setupInstancePresent = false;
    for (var x = 0; x < blocks.length; x++) {
      var func = blocks[x].getSerialSetupInstance;
      if (func) {
        var setupBlockInstanceName = func.call(blocks[x]);
        if (thisInstanceName == setupBlockInstanceName) {
          setupInstancePresent = true;
          break;
        }
      }
    }

// qliic
//    if (!setupInstancePresent) {
      if (false) {
      this.setWarningText(Blockly.Msg.ARD_SERIAL_PRINT_WARN.replace('%1',
          thisInstanceName), 'serial_setup');
    } else {
      this.setWarningText(null, 'serial_setup');
    }
  },
  /**
   * Updates the content of the the serial related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SERIAL_ID', 'serial');
  }
};

//Qliic Scan I2C

Blockly.Blocks['qliic_i2c_scan'] = {
  init: function() {
    this.setHelpUrl('http://www.arduino.cc/en/Serial/Print');
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendDummyInput()
        .appendField('Qliic block I2C scanner')
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

// Qliic Wire

Blockly.Blocks['wire_setup'] = {
  /**
   * Block for setting the speed of the serial connection.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('https://www.arduino.cc/en/Reference/WireBegin');
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendDummyInput()
        .appendField('Setup I2C')
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
  }
};

Blockly.Blocks['wire_begin'] = {
  /**
   * Block for creating a write to serial com function.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://www.arduino.cc/en/Serial/Print');
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendDummyInput()
        .appendField('I2C Begin transmission @')
    this.appendValueInput('CONTENT');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks['wire_request'] = {
  /**
   * Block for creating a write to serial com function.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://www.arduino.cc/en/Serial/Print');
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendDummyInput()
        .appendField('I2C Request @');
    this.appendValueInput('ADRESS');
    this.appendValueInput('NUMBER');
    this.appendDummyInput()
        .appendField('bytes')
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks['wire_end'] = {
  /**
   * Block for creating a write to serial com function.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://www.arduino.cc/en/Serial/Print');
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendDummyInput()
        .appendField('I2C End transmission')
    this.setOutput(true, Blockly.Types.NUMBER.output);
      },
      /** @return {!string} The type of return value for the block, an integer. */
      getBlockType: function() {
        return Blockly.Types.NUMBER;
      }
    };

Blockly.Blocks['wire_write'] = {
  /**
   * Block for creating a write to serial com function.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://www.arduino.cc/en/Serial/Print');
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendDummyInput()
        .appendField('I2C Write byte')
    this.appendValueInput('CONTENT');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks['wire_read'] = {
  /**
   * Block for reading an analogue input.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/AnalogRead');
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendDummyInput()
      .appendField('I2C Read byte');
    this.setOutput(true, Blockly.Types.NUMBER.output);
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};

Blockly.Blocks['wire_available'] = {
  /**
   * Block for reading an analogue input.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/AnalogRead');
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendDummyInput()
      .appendField('I2C Bytes available');
    this.setOutput(true, Blockly.Types.NUMBER.output);
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};

//Qliic setup_loop block

Blockly.Blocks['qliic_setup'] = {
  /**
   * Block for setting the speed of the serial connection.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('https://www.arduino.cc/en/Reference/WireBegin');
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendDummyInput()
        .appendField('Setup')
    this.appendStatementInput('SETUP')
            .appendField(Blockly.Msg.CONTROLS_SETUP);
    this.setInputsInline(true);
  }
};
Blockly.Blocks['qliic_loop'] = {
  /**
   * Block for setting the speed of the serial connection.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('https://www.arduino.cc/en/Reference/WireBegin');
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendDummyInput()
        .appendField('Loop forever')
    this.appendStatementInput('LOOP')
            .appendField(Blockly.Msg.CONTROLS_LOOP);
    this.setInputsInline(true);
  }
};
//Qliic sensor blocks
// qliic_sensor

Blockly.Blocks['qliic_distance_read'] = {
  /**
   * Block for reading an analogue input.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/AnalogRead');
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendDummyInput()
      .appendField('Read distance @4');
    this.setOutput(true, Blockly.Types.NUMBER.output);
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};

Blockly.Blocks['qliic_analog_read'] = {
  /**
   * Block for reading an analogue input.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/AnalogRead');
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendDummyInput()
      .appendField('Read analog value @5');
    this.setOutput(true, Blockly.Types.NUMBER.output);
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};

Blockly.Blocks['qliic_magnenometer_read'] = {
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/AnalogRead');
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendDummyInput()
      .appendField('Read magnetomer @30');
    this.setOutput(true, Blockly.Types.NUMBER.output);
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};

Blockly.Blocks['qliic_magnenometer_value'] = {
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/AnalogRead');
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendDummyInput()
      .appendField('Get magnetomer value')
      .appendField(new Blockly.FieldDropdown(
              Blockly.Arduino.Boards.selected.qliic_magnetometer), 'MAGNETOMETER_ID');

    this.setOutput(true, Blockly.Types.NUMBER.output);
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
/**
 * Returns the serial instance name.
 * @return {!string} Serial instance name.
 * @this Blockly.Block
 */
getSerialSetupInstance: function() {
  return this.getFieldValue('MAGNETOMETER_ID');
},
/**
 * Updates the content of the the serial related fields.
 * @this Blockly.Block
 */
updateFields: function() {
  Blockly.Arduino.Boards.refreshBlockFieldDropdown(
      this, 'MAGNETOMETER_ID', 'serial');
    }
};

Blockly.Blocks['qliic_gyroscope_read'] = {
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/AnalogRead');
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendDummyInput()
      .appendField('Read gyroscope and accelerometer @55');
    this.setOutput(true, Blockly.Types.NUMBER.output);
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};

Blockly.Blocks['qliic_gyroscope_value'] = {
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/AnalogRead');
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendDummyInput()
      .appendField('Get gyroscope value')
      .appendField(new Blockly.FieldDropdown(
              Blockly.Arduino.Boards.selected.qliic_gyroscope), 'MAGNETOMETER_ID');

    this.setOutput(true, Blockly.Types.NUMBER.output);
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
/**
 * Returns the serial instance name.
 * @return {!string} Serial instance name.
 * @this Blockly.Block
 */
getSerialSetupInstance: function() {
  return this.getFieldValue('MAGNETOMETER_ID');
},
/**
 * Updates the content of the the serial related fields.
 * @this Blockly.Block
 */
updateFields: function() {
  Blockly.Arduino.Boards.refreshBlockFieldDropdown(
      this, 'MAGNETOMETER_ID', 'serial');
    }
};


Blockly.Blocks['qliic_color_read'] = {
  /**
   * Block for creating a write to serial com function.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://www.arduino.cc/en/Serial/Print');
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendDummyInput()
          .appendField('Read color sensor @41');
    this.setOutput(true, Blockly.Types.NUMBER.output);
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};

Blockly.Blocks['qliic_color_value'] = {
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/AnalogRead');
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendDummyInput()
      .appendField('Get color sensor value')
      .appendField(new Blockly.FieldDropdown(
              Blockly.Arduino.Boards.selected.qliic_color), 'MAGNETOMETER_ID');

    this.setOutput(true, Blockly.Types.NUMBER.output);
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
/**
 * Returns the serial instance name.
 * @return {!string} Serial instance name.
 * @this Blockly.Block
 */
getSerialSetupInstance: function() {
  return this.getFieldValue('MAGNETOMETER_ID');
},
/**
 * Updates the content of the the serial related fields.
 * @this Blockly.Block
 */
updateFields: function() {
  Blockly.Arduino.Boards.refreshBlockFieldDropdown(
      this, 'MAGNETOMETER_ID', 'serial');
    }
};

// qliic_lcd

Blockly.Blocks['qliic_lcd_setup'] = {
  init: function() {
    this.setHelpUrl('http://www.arduino.cc/en/Serial/Print');
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendDummyInput()
        .appendField('Setup LCD')
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks['qliic_lcd_clear'] = {
  /**
   * Block for reading an analogue input.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/AnalogRead');
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendDummyInput()
      .appendField('Clear LCD');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks['qliic_lcd_cursor'] = {
  /**
   * Block for reading an analogue input.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/AnalogRead');
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendDummyInput()
      .appendField('Set LCD cursor @ line:');
    this.appendValueInput('CONTENTX');
    this.appendValueInput('CONTENTY');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks['qliic_lcd_print'] = {
  /**
   * Block for reading an analogue input.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/AnalogRead');
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendDummyInput()
      .appendField('LCD print');
    this.appendValueInput('CONTENT');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};
