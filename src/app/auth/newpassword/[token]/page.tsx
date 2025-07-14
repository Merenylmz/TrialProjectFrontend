import {NewPasswordComponent} from "../../../../components/Auth/PasswordTaskComponents";

const NewPassword = ({params}: {params:Promise<{token: string}>}) => {

    return (
        <div>
            <NewPasswordComponent params={params}/>
        </div>
    );
}

export default NewPassword;