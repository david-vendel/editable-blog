import Link from 'next/link';


const Error = () => {
    return (<div style={{margin: "20px"}}>
        Error 404! go
            <Link href={"/"}>
                <a>back</a>
            </Link>
    </div>)
};

export default Error