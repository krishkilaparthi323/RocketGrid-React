import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modules: AllModules,
      columnDefs: [
        {
          field: 'Date',
          width: 150,
          filter: 'agTextColumnFilter',
          sort:false,
        },
        {
          field: 'Region',
          width: 90,
          sortable:true,
        },
        {
          field: 'Rep',
          width: 120,
          sortable:true,
          
        },
        {
          field: 'Item',
          width: 120,
          sortable:false,
           },
                {
          field: 'Unit',
          width: 90,
        },
        {
          field: 'UnitCost',
          width: 110,
        },
        {
          field: 'Total',
          width: 100,
          filter: false,
        },
        
      ],
      defaultColDef: {
        editable: true,
        // sortable: true,
        flex: 1,
        minWidth: 100,
        filter: true,
        resizable: true,
      },
        sideBar: {
        toolPanels: [
            {
            id: 'filters',
            labelDefault: 'Filters',
            field:"Item",
            // labelKey: 'filters',
            // iconKey: 'filter',
            toolPanel: 'agFiltersToolPanel',

          },
         ],
              },
     
    };
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const httpRequest = new XMLHttpRequest();
    const updateData = data => {
      this.setState({ rowData: data });
    };

    httpRequest.open(
      'GET',
      'https://my-json-server.typicode.com/krishkilaparthi323/mockjson/sales'
    );
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        updateData(JSON.parse(httpRequest.responseText));
      }
    };
  };

  render() {
    return (
      
       <div style={{ width: '100%', height: '100%' }}>
        <div style={{ height: '100%', boxSizing: 'border-box' }}>
        <div style={{ backgroundColor: '#ccc', padding: '2rem' }}></div>
          
          <div
            id="myGrid"
            style={{
              height: '100%',
              width: '100%',
            }}
            className="ag-theme-alpine"
          >
            <AgGridReact
              modules={this.state.modules}
              columnDefs={this.state.columnDefs}
              defaultColDef={this.state.defaultColDef}
              icons={this.state.icons}
              sideBar={this.state.sideBar}
              frameworkComponents={this.state.frameworkComponents}
              onGridReady={this.onGridReady}
              rowData={this.state.rowData}
            />
           </div>
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector('#root'));