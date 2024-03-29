require('dotenv').config()
const knex= require('knex')

const knexInstance= knex({
  client: 'pg',
  connection: 'postgresql://dunder_mifflin@localhost/knex-practice',
})

function searchByProduceName(searchTerm) {
  knexInstance
    .select('product_id', 'name', 'price', 'category')
    .from('amazong_products')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
      console.log(result)
    })
}

searchByProduceName('holo')


function pagniateProducts(page){
  const limitPerPage = 10;

  const startingPoint= limitPerPage * (page-1)
knexInstance
  .select('product_id', 'name', 'price', 'category')
  .from('amazong_products')
  .limit(limitPerPage)
  .offset(startingPoint)
  .then(result => {
    console.log(result)
  })
}

pagniateProducts(2)

function getProductsWithImages() {
  knexInstance
    .select('product_id', 'name', 'price', 'category', 'image')
    .from('amazong_products')
    .whereNotNull('image')
    .then(result => {
      console.log(result)
    })
}

getProductsWithImages()



function mostPopularVideosForDays(days) {
  knexInstance
    .select('video_name', 'region')
    .count('date_viewed AS views')
    .where(
      'date_viewed',
      '>',
      knexInstance.raw(`now() - '?? days'::INTERVAL`, days)
    )
    .from('whopipe_video_views')
    .groupBy('video_name', 'region')
    .orderBy([
      { column: 'region', order: 'ASC' },
      { column: 'views', order: 'DESC' },
    ])
    .then(result => {
      console.log(result)
    })
}

mostPopularVideosForDays(30)
// .then(results =>{
//     console.log(results)
// })
// console.log(qry)
