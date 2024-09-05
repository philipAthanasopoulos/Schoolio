import React from 'react'
import emptyFolderImage from "../../images/Empty-amico.png"
import { Image } from 'react-bootstrap'

const EmptyFolder = () => {
  return (
    <div className='d-flex flex-column align-items-center justify-content-center vh-80'>
      <Image src={emptyFolderImage} width={300} />
      <h2 className='text-center'>
        Ωχ, φαίνεται ότι δεν υπάρχει τίποτα σε αυτόν τον φάκελο.
        <br />
        <b>Μπορείτε να προσθέσετε νέα αρχεία!</b>
      </h2>
    </div>
  )
}

export default EmptyFolder;