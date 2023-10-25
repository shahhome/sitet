// iceCreamSalesTable.js
import { LightningElement, wire} from 'lwc';
import getIceCreamSales from '@salesforce/apex/IceCreamSalesController.getIceCreamSales';
import getUniqueCities from '@salesforce/apex/IceCreamSalesController.getUniqueCities';

const PAGE_SIZE = 10;

export default class IceCreamSalesTable extends LightningElement {
    cityOptions = [{ label: 'All Cities', value: '' }];
    selectedCity = '';
    totalSales = 0;
    filteredSales = [];
    currentPage = 1;
    totalPages = 0;

    get disablePreviousButton() {
        return this.currentPage === 1;
    }

    get disableNextButton() {
        return this.currentPage === this.totalPages;
    }

    get totalSalesFormatted() {
        return this.totalSales;
    }

    get paginatedSales() {
        const startIndex = (this.currentPage - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        return this.filteredSales.slice(startIndex, endIndex);
    }

    @wire(getUniqueCities)
    wiredUniqueCities({ error, data }) {
        if (data) {
        this.cityOptions = [
            { label: 'All Cities', value: '' },
            ...data.map((city) => ({ label: city, value: city }))
        ];
        } else if (error) {
        console.error(error);
        }
    }

    @wire(getIceCreamSales, { city: '$selectedCity' })
    wiredIceCreamSales({ error, data }) {
        if (data) {
            this.filteredSales = data;
            this.totalPages = Math.ceil(this.filteredSales.length / PAGE_SIZE);
            this.calculateTotalSales();
        } else if (error) {
            console.error(error);
        }
    }

    calculateTotalSales() {
        let total = 0;
        for (let sale of this.filteredSales) {
          total += sale.Amount;
        }
        this.totalSales = total.toFixed(2); // Format totalSales with two decimal places
    }
    
    handleCityChange(event) {
        this.selectedCity = event.detail.selectedOption;
        this.currentPage = 1;
    }

    handlePreviousPage() {
        if (this.currentPage > 1) {
        this.currentPage--;
        }
    }

    handleNextPage() {
        if (this.currentPage < this.totalPages) {
        this.currentPage++;
        }
    }
}
