 import {Options} from './interfaces/Options'
const GridViewOptions:Options = {
    //hiddenColumns :[],
    pagination:{
      pageSize:3,
      paging:true,
      startPage:1
    },
    search:false, 
    selection:true,
    uniqueField:'id',
    headers:[
      {name:'id',sortable:true,dataType:'number',searchable:true},
      {name:'FirstName',sortable:true,dataType:'string',searchable:true},
      {name:'LastName',sortable:true,dataType:'string',searchable:true},
      {name:'Email',sortable:true,dataType:'string',searchable:true},
      {name:'Phone',sortable:true,dataType:'string',searchable:true},
      {name:'DOB',sortable:true,dataType:'string',searchable:false},
      {name:'image',sortable:false,dataType:'image',searchable:false},
      // {name:'id',sortable:true,dataType:'number'},
      // {name:'name',sortable:true,dataType:'string'},
      // {name:'age',sortable:true,dataType:'number'},
      // {name:'active',sortable:false,dataType:'boolean'},

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
      colName:'id',
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