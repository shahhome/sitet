// utilityCombo.js
import { LightningElement, api } from 'lwc';

export default class UtilityCombo extends LightningElement {
  @api options;
  @api selectedOption;
  @api label;

  handleOptionChange(event) {
    // Dispatch a custom event to notify the parent component of the option change
    const selectedOption = event.detail.value;
    const optionChangeEvent = new CustomEvent('optionchange', { detail: { selectedOption } });
    this.dispatchEvent(optionChangeEvent);
  }
}
