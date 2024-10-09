import { Link } from "../Link.jsx";

export default function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <div>
        <img
          src="https://pbs.twimg.com/profile_images/968135590146265088/b4ddrich_400x400.jpg"
          alt="Foto de lesterrsantos"
        ></img>
        <p>Hola me llamo Lester, crear un clone de react router</p>
      </div>

      <Link to="/">Ir a Home</Link>
    </>
  );
}
