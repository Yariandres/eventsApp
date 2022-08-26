import {ToastContainer, toast} from 'react-toastify';
import {useRouter} from 'next/router';
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import { API_URL } from "@/config/index";

import styles from "@/styles/Event.module.css";
import 'react-toastify/dist/ReactToastify.css';

export default function EventPage({ evt }) {
  const { attributes } = evt;
  const router = useRouter();

  const deleteEvent = async () => {
    if(confirm("Are you sure you want to delete this event?")) {
      const res = await fetch(`${API_URL}/api/events/${evt.id}`, {
        method: "DELETE",
      });

      const json = await res.json();
      const event = json.data;

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push(`/events`);
      }
    }
  };
  
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
        <ToastContainer/>
        {attributes.image && (
          <div className={styles.image}>
            <Image
              src={attributes.image.data ? attributes.image.data.attributes.formats.large.url : "/images/event-default.png"}
              width={960}
              height={600}
              alt="event image"
            ></Image>
          </div>
        )}
        <h3>Performers:</h3>
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


  const paths = events.map(evt => ({
    params: { slug: evt.attributes.slug},
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params: { slug }}) {
  const res = await fetch(`${API_URL}/api/events?filters[slug]=${slug}&populate=*`);
  const json = await res.json();
  const events = json.data;
  return {
    props: {
      evt: events[0],
    },
    revalidate: 1,
  };
}