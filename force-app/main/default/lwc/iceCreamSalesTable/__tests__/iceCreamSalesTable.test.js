import { createElement } from 'lwc';
import IceCreamSalesTable from 'c/iceCreamSalesTable';

// Mock data for getUniqueCities and getIceCreamSales
const MockGetUniqueCities = [
  { label: 'City1', value: 'City1' },
  { label: 'City2', value: 'City2' }
  // Add more cities as needed for testing
];

const MockGetIceCreamSales = [
  { Id: '1', Store__r: { Name: 'Store1' }, Amount: 100.0 },
  { Id: '2', Store__r: { Name: 'Store2' }, Amount: 200.0 }
  // Add more sales data as needed for testing
];

// Mocking the wire adapters for getUniqueCities and getIceCreamSales
jest.mock(
  '@salesforce/apex/IceCreamSalesController.getUniqueCities',
  () => {
    return { default: jest.fn() };
  },
  { virtual: true }
);

jest.mock(
  '@salesforce/apex/IceCreamSalesController.getIceCreamSales',
  () => {
    return { default: jest.fn() };
  },
  { virtual: true }
);

describe('c-ice-cream-sales-table', () => {
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    jest.clearAllMocks();
  });

  it('displays city options on load', () => {
    const element = createElement('c-ice-cream-sales-table', {
      is: IceCreamSalesTable
    });
    document.body.appendChild(element);

    // Simulate a successful @wire(getUniqueCities) call
    const getUniqueCitiesAdapter = element.shadowRoot.querySelector(
      'c-ice-cream-sales-table-lwc__get-unique-cities-adapter'
    );
    getUniqueCitiesAdapter.emit(MockGetUniqueCities);

    return Promise.resolve().then(() => {
      // Ensure that city options are displayed correctly
      const combobox = element.shadowRoot.querySelector('lightning-combobox');
      expect(combobox.options).toEqual([
        { label: 'All Cities', value: '' },
        { label: 'City1', value: 'City1' },
        { label: 'City2', value: 'City2' }
      ]);
    });
  });

  it('displays sales data on load', () => {
    const element = createElement('c-ice-cream-sales-table', {
      is: IceCreamSalesTable
    });
    document.body.appendChild(element);

    // Simulate a successful @wire(getIceCreamSales) call
    const getIceCreamSalesAdapter = element.shadowRoot.querySelector(
      'c-ice-cream-sales-table-lwc__get-ice-cream-sales-adapter'
    );
    getIceCreamSalesAdapter.emit(MockGetIceCreamSales);

    return Promise.resolve().then(() => {
      // Ensure that sales data is displayed correctly
      const salesRows = element.shadowRoot.querySelectorAll('table tbody tr');
      expect(salesRows.length).toBe(2); // Adjust with your mock data count
    });
  });

  it('handles city change', () => {
    const element = createElement('c-ice-cream-sales-table', {
      is: IceCreamSalesTable
    });
    document.body.appendChild(element);

    // Simulate a successful @wire(getUniqueCities) call
    const getUniqueCitiesAdapter = element.shadowRoot.querySelector(
      'c-ice-cream-sales-table-lwc__get-unique-cities-adapter'
    );
    getUniqueCitiesAdapter.emit(MockGetUniqueCities);

    // Simulate a successful @wire(getIceCreamSales) call
    const getIceCreamSalesAdapter = element.shadowRoot.querySelector(
      'c-ice-cream-sales-table-lwc__get-ice-cream-sales-adapter'
    );
    getIceCreamSalesAdapter.emit(MockGetIceCreamSales);

    return Promise.resolve()
      .then(() => {
        // Change the city selection
        const combobox = element.shadowRoot.querySelector('lightning-combobox');
        combobox.value = 'City1';
        combobox.dispatchEvent(new CustomEvent('change'));
      })
      .then(() => {
        // Ensure that city change updates the filtered sales data
        // You can add specific assertions based on your mock data
        const salesRows = element.shadowRoot.querySelectorAll('table tbody tr');
        expect(salesRows.length).toBe(1); // Adjust with your mock data
      });
  })

  // Add more test cases for pagination and other interactions as needed
})
