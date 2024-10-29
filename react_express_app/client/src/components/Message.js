import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

export default function Message(text, gravity, position, background, color){
    return (
        Toastify({
            text: text,
            duration: 2000,
            close: true,
            gravity: gravity,
            position: position,
            style: {
                background: background,
                color: color
            }
        }).showToast()
    )
}