import { UntypedFormControl, UntypedFormGroup } from "@angular/forms";
import { TotsFieldForm } from "../entities/tots-field-form";

export class TotsFormHelper {
    /**
     * Crea un form control basico para el formulario
     * @param field
     * @param group
     * @returns
     */
    static createFormControl(field: TotsFieldForm, group: UntypedFormGroup): UntypedFormControl {
        // Create Control
        let newInput = new UntypedFormControl();
        // Config validators
        if(field.validators != undefined && field.validators.length > 0){
            newInput.setValidators(field.validators);
        }
        // If include default value
        if(field.extra && field.extra.default_value){
          newInput.setValue(field.extra.default_value);
        }
        // if disable
        if(field.extra && field.extra.disabled){
            newInput.disable();
        }
        // Add in Group
        if(Array.isArray(field.key)){
          group.addControl(field.key.join('_'), newInput);
        } else {
          group.addControl(field.key, newInput);
        }
        // Return control
        return newInput;
    }
    /**
     * Obtiene el valor de un objeto a traves de la KEY
     * @param item
     * @param key
     * @returns
     */
    static getItemValueByKey(item: any, key: string|Array<string>|undefined): any {
        if(key == undefined){
            return '';
          }

          if (typeof key == 'string' && item[key] != undefined) {
            return item[key];
          }

          let valueFinal = item;
          for (const keyObj of key!) {
            if(valueFinal[keyObj] == undefined){
              return '';
            }
            valueFinal = valueFinal[keyObj];
          }
          return valueFinal;
    }

    static setValueInItemByKey(item: any, key: string|Array<string>|undefined, value: any): any {
      if(key == undefined){
        return '';
      }

      if (typeof key == 'string') {
        item[key] = value;
        return item;
      }

      // Inicializa una variable de referencia que apunte al objeto principal
      let currentObj = item;

      // Utiliza un bucle para acceder a la propiedad deseada
      for (let i = 0; i < key.length; i++) {
        const internalKey = key[i];

        // Verifica si estamos en la última clave
        if (i === key.length - 1) {
            // Asigna el valor en la última propiedad
            currentObj[internalKey] = value;
        } else {
            // Avanza al siguiente objeto anidado
            currentObj = currentObj[internalKey];
        }
      }

    }
}
