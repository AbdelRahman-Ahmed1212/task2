 import {Options} from './interfaces/Options'
const GridViewOptions:Options = {
    pagination:{
      pageSize:3,
      paging:true,
      startPage:1
    },
    search:false, 
    selection:true,
    uniqueField:'id',
    headers:[
      {name:'id',sortable:false,dataType:'string',searchable:false},
      {name:'arLink',sortable:false,dataType:'string',searchable:false},
      {name:'enLink',sortable:true,dataType:'string',searchable:false},
      {name:'LinkName',sortable:true,dataType:'link',searchable:true},
      {name:'quick_Access',sortable:true,dataType:'enum',searchable:true,enum:{
       0: 'Active',
        1:'Deactive'
      }},
     


    ],

    Actions:[
    {
        Name:'Delete',
        Rule:(obj:any)=> obj['id'] > 15
        
    },
    {
      Name:'Edit',
      Rule:(obj:any)=> obj['id'] <=15
     
  }
  ],
  ToggleRule:(obj:any)=> obj['id'] > 14,
  DefaultSortedColumn:{
      colName:'Id',
      direction:'asc',
      dataType:'number',
  },
  searchableColumns:[
    {
      name:'age' , periority:1
    },
    {
      name:'id' , periority:0
    }
  ],
  Translation:{
    language:'ar',
    languages:['ar','en'],
    translation:false,
    TranslationPath:'./assets/i18n/users/'
  }
  ,
  selectAll:true
  }  
export default GridViewOptions