import { FormInput } from "@/components/Form/FormInput";
import axios from "axios";
import { useEffect, useState } from "react";

const InterestedSubjectInput = () => {
    const [tags, setTags] = useState(['개발','경영','어학']);
    const [newTag, setNewTag] = useState('');
    const [disabled, setDisabled] = useState(false);

    const tagApi = axios.create({
        baseURL: "http://localhost:4000"
    })

    useEffect(() => {
        getTagLists
    },[])

    const getTagLists = async() => {
        try{
            const response = await tagApi.get('/tags')
            // response.data {id:1, name: ['front', 'back']}
            setTags(response.data.name);
        } 
        catch(error: any){
            console.log(error)
        }
    }

    const removeTag = (idx: number) => {
        const updatedTags = [...tags];
        updatedTags.splice(idx,1);
        setTags(updatedTags);
    }

    const removeAllTags = () => {
        setTags([]);
    }

    const addTag = () => {
        const newTags = newTag.split(",").map((tag) => tag.trim()).filter((tag) => tag && !tags.includes(tag));
        if(newTag.length >0){
            setTags([...tags,...newTags]);
        }
        setNewTag("")
    }

    const handleSaveTags = async() => {
        try{
            setDisabled(true);
            const response = await tagApi.post("/tags/save", tags)
            if(response.data.status) setDisabled(false);
        }
        catch(error: any){
            console.log(error);
        }
        
    }
    return (
        <div className="">
            <div className="">
                <div className="">
                    <button onClick={removeAllTags}>Remove all</button>
                </div>
                <div className="">
                    <ul>
                        {tags.map((tag,idx) => (
                            <li key={idx}>
                                {tag}
                                <i className="fa fa-trash-o" aria-hidden="true" onClick={() => removeTag(idx)}></i>
                            </li>

                        ))}

                        <FormInput
                            name="interestedSubjectTag"
                            /* value값 체크 */ 
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyUp={(e) => {
                                if(e.key === 'Enter'){
                                    addTag();
                                }
                            }}
                        />
                    </ul>
                </div>
                <button onClick={handleSaveTags} disabled={disabled}>선택 완료</button>
                
            </div>
        </div>
    )
}

export default InterestedSubjectInput;