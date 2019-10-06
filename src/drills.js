require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
  client:'pg',
  connection: 'postgresql://dunder_mifflin@localhost/knex-practice',
})
// knexInstance
// .select('*')
// .from('shopping_list')
// .then(results =>{
//   console.log(results)
// })
function searchForName(searchterm){
  knexInstance
  .select('item_id','name','price','date_added','category')
  .from('shopping_list')
  .where('name','ILIKE',`%${searchterm}%`)
  .then(results =>{s
    console.log(results)
  })
}

searchForName('dog')

function pagniatePage(page){
   const limit = 6;
  const offset = 6 * (page-1)
   knexInstance
   .select('*')
   .from('shopping_list')
   .limit(limit)
   .offset(offset)
   .then(results =>{
console.log(results)
   })
}

pagniatePage(2)