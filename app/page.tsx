import Image from "next/image";

export default function Home() {
  return (
    <main>
      <h1>CROWDGRID</h1>

      <p>Choose a workflow</p>

      <div>
        <a href="/corporate">Corporate</a>
        <a href="/gathering">Gathering</a>
        <a href="/pathway">Pathway Selection</a>
        <a href="/pilgrim">Pilgrim Portal</a>
        <a href="/volunteer">Volunteer Registration</a>
      </div>
    </main>
  );
}