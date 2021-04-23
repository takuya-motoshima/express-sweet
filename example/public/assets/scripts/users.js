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
      {data: 'modified', width: 120},
      {data: 'actions', width: 270}
    ],
    columnDefs: [
      {
        targets: -1,
        orderable: false,
        render: (data, type, row, meta) => 
          `<a href="/workers/${row.id}" class="btn btn-success btn-pill"><i class="flaticon-edit"></i>編集する</a>
          <button on-delete type="button" class="btn btn-danger btn-pill"><i class="flaticon2-trash"></i>削除する</button>`
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