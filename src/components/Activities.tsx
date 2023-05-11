export default function Activities({data}: {data: object[]}) {
    return (
        <ul>
            <li>{data.length}</li>
        </ul>
    );
}