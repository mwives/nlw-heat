import { serverHttp } from "./app";

const PORT = process.env.PORT || 3333;

serverHttp.listen(PORT, () => console.log(`Server running on port ${PORT}`));
