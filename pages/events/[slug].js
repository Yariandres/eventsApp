import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";

export default function EventPage({ evt, events }) {
  const deleteEvent = async id => {
    const res = await fetch(`${API_URL}/api/events/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data);
  };
  
  const { attributes } = evt;
  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>Edit Event</a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>
        <span>
          {new Date(attributes.date).toLocaleDateString('en-GB')} at {attributes.time}
        </span>
        <h1>{attributes.name}</h1>
        {attributes.image && (
          <div className={styles.image}>
            <Image
              src={events.attributes[0].image.data.attributes.formats.thumbnail.url}
              width={960}
              height={600}
              alt="event image"
            ></Image>
          </div>
        )}
        <h3>Performerse:</h3>
        <p>{attributes.performers}</p>
        <h3>Description</h3>
        <p>{attributes.description}</p>
        <h3>Venue: {attributes.venue}</h3>
        <p>{attributes.address}</p>

        <Link href="/events">
          <a className={styles.back}>
            {'<'} Go back to events
          </a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events?[populate]=*`);
  const json = await res.json();
  const events = json.data;

  console.log('From getStaticPaths', events)

  const paths = events.map(evt => ({
    params: { slug: evt.attributes.slug},
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params: { slug }}) {
  const res = await fetch(`${API_URL}/api/events?filters[slug]=${slug}`);
  const json = await res.json();
  const events = json.data;
  {console.log('json', events)}
  return {
    props: {
      evt: events[0],
    },
    revalidate: 1,
  };
}