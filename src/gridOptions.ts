 import {Options} from './interfaces/Options'
const GridViewOptions:Options = {
    hiddenColumns :[],
    pagination:{
      pageSize:3,
      paging:true,
      startPage:1
    },
    search:false, 
    selection:true,
   
    headers:[
      {name:'id',sortable:true,dataType:'number'},
      {name:'name',sortable:true,dataType:'string'},
      {name:'age',sortable:true,dataType:'number'},
      {name:'Active',sortable:false,dataType:'boolean'}
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
      colName:'age',
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
    translation:true,
    TranslationPath:'./assets/i18n/users/'
  }

  }  
export default GridViewOptions