import { Form } from "react-router-dom";
import Favorite from "../../components/Favorite";
import './character.css';

type Props = {}

// export async function action({ request, params }) {
//     const formData = await request.formData();
//     return updateContact(params.contactId, {
//         favorite: formData.get("favorite") === "true",
//     });
// }

// export async function loader({ params }) {
//     const contact = await getContact(params.contactId);
//     if (!contact) {
//         throw new Response("", {
//             status: 404,
//             statusText: "Not found",
//         });
//     }
//     return { contact };
// }

const Character = (props: Props) => {
    // const { contact } = useLoaderData();
    return (
        <div id="contact">
            <div className="relative">
                <img
                    className="contactImg"

                    src=""
                />
            </div>
            <div className="favorite">
                <Favorite />
            </div>
            <h1>Nombre</h1>

            <div className="containerInfo">
                <p className="info">
                    <span>Specie</span>
                    <span>Human</span>
                </p>
                <p className="info">
                    <span>Status</span>
                    <span>Alive</span>
                </p>
                <p className="info">
                    <span>Occupation</span>
                    <span>Princess</span>
                </p>
                {/* <div>
                    <Form action="edit">
                        <button type="submit">Edit</button>
                    </Form>
                </div> */}
            </div>
        </div>
    );
}

export default Character;