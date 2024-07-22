 import {Options} from './interfaces/Options'
const GridViewOptions:Options = {
    //hiddenColumns :[],
    pagination:{
      pageSize:3,
      paging:true,
      startPage:1
    },
    search:false, 
    selection:false,
   
    headers:[
      {name:'id',sortable:true,dataType:'number'},
      {name:'FirstName',sortable:true,dataType:'string'},
      {name:'LastName',sortable:true,dataType:'string'},
      {name:'Email',sortable:true,dataType:'string'},
      {name:'Phone',sortable:true,dataType:'string'},
      {name:'DOB',sortable:true,dataType:'string'},
      // {name:'id',sortable:true,dataType:'number'},
      // {name:'name',sortable:true,dataType:'string'},
      // {name:'age',sortable:true,dataType:'number'},
      // {name:'active',sortable:false,dataType:'boolean'},

    ],

    Actions:[
    {
        Name:'Delete',
        Rule:(obj:any)=>{
            return obj['Active'] == false
        }
    },
    {
      Name:'Edit',
      Rule:(obj:any)=>{
          return obj['Active'] == true
      }
  },
  ],
  DefaultSortedColumn:{
      colName:'id',
      direction:'asc',
      dataType:'number'
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

  }  
export default GridViewOptions