//import 'emoji-mart/css/emoji-mart.css'
//import { Picker } from 'emoji-mart'
import Picker from 'emoji-picker-react';
// import { EmojiPicker } from 'react-twemoji-picker';
// import EmojiData from "react-twemoji-picker/data/twemoji.json";
export default function EmojiePicker(props) {
   
    return (<>
   


     <Picker disableSkinTonePicker={true} disableSearchBar={true} pickerStyle={{"height":"220px"}} onEmojiClick={(evevt,emoji)=>props.onEmojiClick(evevt,emoji)} />
        {/* /<Picker set='twitter' onSelect={(emoji)=>props.onEmojiClick(emoji)} /> */}
  
    </>
    )
}