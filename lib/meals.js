import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import fs from 'fs';
const db =sql('meals.db'); 

export async function getMeals(){

    await new Promise((resolve) =>setTimeout(resolve,2000));//latency
    return  db.prepare('SELECT * FROM meals').all();
}

export  function getMeal(slug){
    
    return db.prepare('SELECT * From meals WHERE slug = ?').get(slug); //prevent sql injection
}
// save the new details
export async function saveMeal(meal){
    meal.slug=slugify(meal.title,{lower:true});
    meal.instructions=xss(meal.instructions);

    const extension =meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`;

    const stream=fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage= await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (error)=>{
        if(error){
            throw new Error('Saving image failed!');
        }
    });  // Images are saved in the public/images folder


    meal.image = `/images/${fileName}`;

    db.prepare('INSERT INTO meals (title,summary,instructions,creator,creator_email,image,slug) VALUES (@title,@summary,@instructions,@creator,@creator_email,@image,@slug)').run(meal); // Insert the meal into the database

}


export function deleteMeal(slug) {
    const meal = getMeal(slug);
    if (!meal) return; // If meal doesn't exist, stop

    if (meal.image) {
    if (meal.image) {
        fs.unlinkSync(`public${meal.image}`);
    }

    // Delete from database
    db.prepare('DELETE FROM meals WHERE slug = ?').run(slug);
}
}
