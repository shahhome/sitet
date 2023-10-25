// utilityPagination.js
import { LightningElement, api } from 'lwc';

export default class UtilityPagination extends LightningElement {
  @api disablePreviousButton;
  @api disableNextButton;

  handlePreviousPage() {
    // Dispatch an event to notify the parent component of the previous page action
    this.dispatchEvent(new CustomEvent('previouspage'));
  }

  handleNextPage() {
    // Dispatch an event to notify the parent component of the next page action
    this.dispatchEvent(new CustomEvent('nextpage'));
  }
}
