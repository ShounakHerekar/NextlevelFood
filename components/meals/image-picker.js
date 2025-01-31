'use client'
import { useRef,useState } from "react"; // Import useRef
import classes from "./image-picker.module.css"

export default function ImagePicker({ label, name }) {
    const [pickedImage,setPickedImage]=useState();
    const imageInput = useRef(); // Create reference to the file input

    function handlePick() {
        imageInput.current.click(); // Programmatically trigger file input click
    }

    function handleImageChange(event){
        const file=event.target.files[0];
        
        if(!file){
            setPickedImage(null);
            return;
        }

        const fileReader=new FileReader();
        fileReader.onload=()=>{
            setPickedImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);

    }

    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No image picked yet.</p>}
                    {pickedImage && <img src={pickedImage} alt="THe Image selected by the user." fill/>}
                </div>
                <input 
                    className={classes.input}
                    type="file"
                    id={name}
                    accept="image/png, image/jpeg"
                    name={name}
                    ref={imageInput} // Attach the ref
                    onChange={handleImageChange}
                    required
                />
                <button className={classes.button} type="button" onClick={handlePick}>
                    Pick an Image
                </button>
            </div>
        </div>
    ); 
}
