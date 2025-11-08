// https://www.freecodecamp.org/portuguese/news/introducao-ao-mongoose-para-mongodb/#:~:text=%2C%20emailSchema)-,Opera%C3%A7%C3%B5es%20b%C3%A1sicas,-O%20Mongoose%20tem
let slide_model = require('./slide')

let slide = new slide_model({
    titulo: "Defesa TCC Ana Maria",
    duracao: 30,
    conteudo: "<h1>Defesa de TCC</h1><h2>Ana Maria</h2><p>Data: 10/12, Sala A-316</p>",
    data_expiracao: "<h1>Defesa de TCC</h1><h2>Ana Maria</h2><p>Data: 10/12, Sala A-316</p>"
})

// --- CRIAR ---//
async function criar_slide(slide){
    try{
        let slide = new slide_model({
        titulo: slide.titulo,
        duracao: slide.duracao,
        conteudo: slide.conteudo,
        data_expiracao: slide.data_expiracao 
    });

    let slide_salvo = await slide.save();

    console.log("Slide salvo com sucesso:", slide_salvo);
    return slide_salvo;
    }
    catch (err) {
    console.error("Erro ao salvar o slide:", err);
    }
        
}
// --- EDITAR ---//
async function editar_slide(slide_titulo, slide_novo_titulo){
    slide_model.findOneAndUpdate(
        {
            titulo: slide.slide_titulo
        },
        {
            titulo: slide.slide_novo_titulo
        },
        {
            new: true,  
            runValidators: true  
        }
    )
    .then(doc => {
        console.log(doc)
    })
    .catch(err => {
        console.error(err)
    })
}

// --- REMOVER ---//
async function remover_slide(slide_titulo, slide_novo_titulo){
    slide_model.findOneAndRemove(
        {
            titulo: slide.slide_titulo
        },
    )
    .then(response => {
        console.log(response)
    })
    .catch(err => {
        console.error(err)
    })
}
// --- LISTAR SLIDES ATIVOS ---//
async function get_slides_ativos(){
    try {
    const agora = new Date();

    //    o campo 'data_expiracao' é MAIOR QUE ($gt) a data 'agora'."
    const slides_validos = await SlideModel.find({
      data_expiracao: { $gt: agora }
    });

    return slides_validos;

  } catch (err) {
    console.error("Erro ao buscar slides ativos:", err);
    // Retorna um array vazio se der erro, para não quebrar a aplicação
    return []; 
  }
}
module.exports = {
  criar_slide,
  editar_slide,
  remover_slide,
  get_slides_ativos
};