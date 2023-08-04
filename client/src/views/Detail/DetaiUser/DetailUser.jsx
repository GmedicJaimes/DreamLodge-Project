import { useDispatch, useSelector } from "react-redux"
// import { getDetailUser } from "../../../redux/actions"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { Link } from "react-router-dom"

const DetailUser = () => {

    const { id } = useParams()
    const dispatch = useDispatch()

    const user = useSelector((state) => state.detailUser)
    
    useEffect(() => {
        dispatch(getDetailUser(id))
    }, [ dispatch ])

    return(
        <div>
            <div>
                <div>
                    
                </div>
                <div>
                    <h2>Lionel Messi</h2>
                    <p>Owner</p>
                    <p>Argebtuba</p>
                </div>
                <div>
                    <h3>Score</h3>
                    <p>5 Stars</p>
                    <h3>Years as owner</h3>
                    <p>7</p>
                </div>
            </div>
            <div>
                <div>
                    <h4>My Properties</h4>
                    <h4>Reviews</h4>
                    <h4>Photos and Videos</h4>
                </div>
                <div>
                    <div>
                        <div>
                            <img src="" alt="" />
                        </div>
                        <div>
                            <h4>Rooms: 2</h4>
                            <h4>Precio por noche: $200</h4>
                            <Link to={"/rooms"}>
                                <button>Ver mas</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailUser;