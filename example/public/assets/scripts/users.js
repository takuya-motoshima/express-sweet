/*User list page script*/

// Main processing.
// Set up data table.
const dt = $('#table')
  .on('draw.dt', () => {
    $("#table_processing").hide();
  })
  .DataTable({
    processing: true,
    serverSide: true,
    searchDelay: 500,
    ajax: {
      // URL to get list data.
      url: '/api/users',
      // Set action column elements.
      dataSrc: res => res.data.map(row => Object.assign(row, {actions: ''})),
      // For Ajax, send a cookie.
      xhrFields: {withCredentials: true}
    },
    columns: [
      {data: 'id', width: 30},
      {data: 'email'},
      {data: 'name'},
      {data: 'modified', width: 200},
      {data: 'actions', width: 150}
    ],
    columnDefs: [
      {
        targets: -1,
        orderable: false,
        render: (data, type, row) => `<a href="/users/${row.id}" class="btn btn-success">Edit</a><button on-delete type="button" class="btn btn-danger mx-2">Delete</button>`
      }
    ],
    dom: `<'row'<'col-12'f>><'row'<'col-12'tr>><'row'<'col-12 dataTables_pager'p>>`,
    scrollX: true,
    responsive: true,
    pageLength: 30,
    fnServerParams: params => {
      params.offset = params.start;
      delete params.start;
      params.limit = params.length;
      delete params.length;
      const cols = Object.assign({}, params.columns);
      delete params.columns;
      const {column: index, dir} = params.order[0];
      params.order = cols[index].data;
      params.dir = dir;
      params.search = params.search.value;
    }
  });