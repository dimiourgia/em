import Card from '../components/WomenWarriorCard/Index';
import TopMessage from '../components/WomeWarriorTopMessage/Index';

const data = [
    {
      "name": "Indira Gandhi",
      "content": "Indira Gandhi, the first and only female Prime Minister of India, remains a towering figure in Indian politics. Born in 1917, she was the daughter of Jawaharlal Nehru, India’s first Prime Minister. Indira Gandhi rose to power in 1966 and served until 1977, and then again from 1980 until her assassination in 1984. Despite facing immense opposition from a male-dominated political landscape, she demonstrated unwavering determination and leadership. Her tenure saw significant events such as the Green Revolution, which transformed India's agriculture, and the 1971 Indo-Pak war leading to the creation of Bangladesh. Gandhi's decisive and sometimes controversial policies earned her both admiration and criticism, but she remains a symbol of strong, assertive leadership in the face of patriarchal opposition.",
      "image": "https://assets.editorial.aetnd.com/uploads/2009/11/gettyimages-167875874.jpg?width=1920&height=960&crop=1920%3A960%2Csmart&quality=75&auto=webp"
    },
    {
      "name": "Marie Curie",
      "content": "Marie Curie, born in Poland in 1867, was a physicist and chemist who made groundbreaking contributions to science. She was the first woman to win a Nobel Prize and the only person to win Nobel Prizes in two different scientific fields (Physics and Chemistry). Despite facing significant gender-based barriers in the scientific community, Curie's research on radioactivity laid the foundation for many modern scientific advancements. Her discoveries of polonium and radium opened new frontiers in medical treatment and research. Marie Curie’s relentless pursuit of knowledge and her ability to transcend the gender norms of her time have made her a lasting inspiration for women in science worldwide.",
      "image": "https://www.palatinate.org.uk/wp-content/uploadedImages/12835367815_5f79f04ef8_o-e1646503737820.jpg"
    },
    {
      "name": "Frida Kahlo",
      "content": "Frida Kahlo, born in 1907 in Mexico, is celebrated as one of the most influential artists of the 20th century. Her vivid and emotionally intense paintings often depicted themes of pain, identity, and the female experience, challenging the norms of both the art world and society. Despite suffering from lifelong health issues due to a severe accident, Kahlo’s work was unapologetically bold and personal, breaking taboos and addressing issues such as gender, class, and post-colonialism. Her distinctive style and fearless exploration of her own struggles have cemented her legacy as a powerful voice against patriarchal constraints in the world of art.",
      "image": "https://i.natgeofe.com/n/128c169c-2fbe-4a53-b48c-ec92d1357660/05-frida-kahlo-difficult-women_16x9.jpg"
    },
    {
      "name": "Savitribai Phule",
      "content": "Savitribai Phule, born in 1831 in India, was a pioneering social reformer and educator who fought against the deeply entrenched patriarchal norms of her time. Along with her husband, Jyotirao Phule, she established the first women's school in Pune, India, in 1848. Despite facing severe opposition, including physical attacks, Savitribai remained steadfast in her mission to educate and empower women and lower-caste individuals. She also worked tirelessly to abolish discriminatory practices such as child marriage and the treatment of widows. Savitribai Phule's relentless advocacy for education and equality has left an indelible mark on Indian society and continues to inspire generations in the fight against patriarchy and social injustice.",
      "image": "https://indianexpress.com/wp-content/uploads/2017/12/savitribai_759.jpg"
    },
    {
      "name": "Rosa Parks",
      "content": "Rosa Parks, born in 1913 in Alabama, USA, is celebrated as a pivotal figure in the American Civil Rights Movement. On December 1, 1955, Parks famously refused to give up her seat to a white passenger on a Montgomery bus, defying the segregation laws of the time. This act of defiance sparked the Montgomery Bus Boycott, a pivotal event that lasted over a year and led to a Supreme Court ruling that segregation on public buses was unconstitutional. Parks faced arrest and harassment but remained resolute in her fight against racial injustice. Her bravery and steadfast commitment to equality have made her an enduring symbol of resistance against racial oppression and a key figure in the struggle for civil rights in the United States.",
      "image": "https://www.timeforkids.com/wp-content/uploads/2020/08/AG_rosa.jpg"
    },
    {
      "name": "Dr. Anandibai Joshi",
      "content": "Dr. Anandibai Joshi, born in 1865 in Maharashtra, India, broke societal norms to become the first Indian woman to earn a degree in Western medicine. Married at a young age, Anandibai faced personal tragedies, including the death of her infant son due to lack of medical care, which motivated her to pursue a career in medicine. Despite societal opposition and health challenges, she traveled to the United States to study at the Woman’s Medical College of Pennsylvania. Graduating in 1886, she returned to India as a qualified doctor, inspiring many women to pursue education and professional careers. Her determination and pioneering spirit paved the way for future generations of Indian women in the field of medicine, challenging the traditional gender roles and contributing to the advancement of healthcare in India.",
      "image": "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202003/anandi-gopal-joshis-153rd-birt.jpeg?size=690:388"
    }
  ]
  


export default function(){

    return(<div>
        <TopMessage/>

        <div className='mt-20'>
            {data.map(women=><Card title={women.name} content={women.content} imageSrc={women.image} />)}
        </div>

    </div>);
}