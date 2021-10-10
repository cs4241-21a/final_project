import React from "react";
import ReactDOM from "react-dom";
import "./css/styles.css";
import PersonIcon from '@mui/icons-material/Person';
// npm install @mui/icons-material @emotion/react @emotion/styled 
import { ImagePicker } from 'react-file-picker'

class ProfileImage extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            imagePath: this.props.imagePath
        }

        // this.updateProfileImg = this.updateProfileImg.bind(this)
    }

    // updateProfileImg(base64){
    //     console.log("base64: ", base64)

    // }

    render() {
        return(
            <>
            {/* <div id="profileImg" style={{height: '50px', width: '50px', backgroundColor: 'white'}}>
                <PersonIcon style={{height: '50px', width: '50px'}} onClick={this.updateProfileImg}/>
            </div>
            <input id="imageUpload" style={{display: 'none'}} type="file" name="profile_photo" placeholder="Photo" required="" capture/> */}
            <div style={{width: 100, height: 100, backgroundColor: 'white'}}>
                <ImagePicker
                    extensions={['jpg', 'jpeg', 'png']}
                    dims={{minWidth: 100, maxWidth: 500, minHeight: 100, maxHeight: 500}}
                    // onChange={base64 => (this.updateProfileImg(base64))}
                    // onError={errMsg => ()}
                    >     
                    <div id="profileImg" style={{height: '50px', width: '50px', backgroundColor: 'white'}}>
                        <PersonIcon style={{height: '100px', width: '100px'}}/>
                    </div>
                </ImagePicker>
            </div>
            </>
        )
    }

}

export default ProfileImage;