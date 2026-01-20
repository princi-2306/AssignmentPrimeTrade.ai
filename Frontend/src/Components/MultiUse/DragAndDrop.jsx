import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { assets } from '../../assets/assets'

const DragAndDrop = (props) => {
    const onDrop = useCallback(acceptedFiles => {
        props.imgData(acceptedFiles)
        // console.log(acceptedFiles)
      }, [])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    
      return (
        <div className='border rounded-lg text-center my-4 md:py-14' {...getRootProps()}>
          <input {...getInputProps()} />
          {
            isDragActive ? (
              <div className='flex justify-center items-center flex-col'>
                <img className='w-10' src={assets.Upload} alt="" /> 
                <p>Drop the files here ...</p> 
              </div>
            ) : (
              <p>
                Drag 'n' drop some 
                  <span className='text-blue-700 pl-1 cursor-pointer underline'>
                    files here
                  </span>
                , or 
                  <span className='text-blue-700 pl-1 cursor-pointer underline'>
                    click to select files
                  </span>
              </p>
            )
          }
        </div>
      )
}

export default DragAndDrop
