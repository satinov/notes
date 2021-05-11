import { FC } from "react";

type ClassesKeys = "content" | "contentShift" | "drawerHeader";

interface Props {
  classes: Record<ClassesKeys, string>;
  open: boolean;
}

export const Main: FC<Props> = ({ classes, open }) => {
  return (
    <main className={classes.content}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea itaque
      veritatis repellat excepturi officiis quisquam, vero esse aspernatur odit
      officia porro error animi inventore facere. Sint labore rerum cum qui
      sequi distinctio dolores architecto delectus aliquam reiciendis,
      doloremque inventore vero assumenda omnis at cupiditate sed? Debitis
      dolorem fugiat corrupti hic provident velit doloribus. Repellat molestias
      saepe dolore dolorum reprehenderit nisi eos labore hic vero, nam fugit
      sunt quo, amet laboriosam facilis. Fugiat consectetur sunt sapiente
      veritatis molestiae, temporibus distinctio odio facilis qui quasi nemo nam
      fugit quia? Illum eveniet incidunt expedita architecto sed placeat
      possimus molestiae nisi dignissimos magni ducimus sit tempora, aliquid
      quasi veniam ex delectus laboriosam cumque dolore quas sapiente in et
      quis. Beatae adipisci possimus voluptatum labore ad inventore eum est non,
      id, accusantium quisquam sunt nobis numquam dignissimos sapiente dolorum
      tempora reprehenderit officia dicta consequuntur explicabo deserunt.
      Molestias eveniet aliquid harum architecto inventore perferendis,
      accusamus a nam natus. Provident deleniti consectetur earum vero,
      veritatis incidunt maxime minima officia numquam dolorem sequi possimus ad
      aperiam accusantium atque, magnam, laudantium pariatur iusto. Asperiores
      voluptatum consequatur adipisci sit dolore minus labore beatae doloribus
      quos velit quae atque porro, voluptatibus est sapiente ex rem vel. Veniam
      quaerat porro illum reprehenderit harum, commodi natus ducimus enim,
      molestiae iure ex? Nemo recusandae id facere exercitationem consequuntur
      iusto perferendis doloremque nostrum dolorum harum quia quam dolore,
      necessitatibus autem voluptatibus voluptatum eum tempora natus aliquam,
      voluptates quas odio optio! Quibusdam deserunt rem officiis numquam hic
      animi veritatis esse saepe velit porro nostrum eaque temporibus fugit ea
      dolor dignissimos quod nam ad, placeat ex quis atque soluta quaerat.
      Tempore a quam totam iste quidem recusandae doloribus hic mollitia
      blanditiis ipsa. Tenetur ipsam ipsum reiciendis, delectus omnis unde alias
      excepturi similique enim nesciunt accusamus earum fuga quam impedit
      cupiditate nobis. Saepe alias sit aliquam ducimus accusantium repellendus
      mollitia atque eos voluptatem? Illo in dolor officiis distinctio quisquam
      aut eum provident harum saepe. Asperiores excepturi iste consequuntur
      consectetur quam doloribus accusantium delectus mollitia necessitatibus
      totam, sed eos! Iste eaque sapiente tempora magni eum facilis
      reprehenderit illum saepe numquam exercitationem maiores velit, provident
      labore aut delectus quo, temporibus incidunt doloribus? Doloremque id
      delectus commodi, natus ea blanditiis ipsum. Neque incidunt vero officiis
      reprehenderit, minima doloribus, vitae animi deserunt iusto, dicta
      aliquam. Eos eligendi laboriosam asperiores doloribus accusamus magnam
      quis, dignissimos ad sunt non eius, dolore qui quaerat, assumenda pariatur
      doloremque odio unde. Mollitia iure itaque corrupti molestias velit
      explicabo dolor quisquam non? Neque eligendi nostrum error fugiat,
      delectus nam? Numquam facere omnis voluptate fuga dolorum aliquid
      incidunt, velit non nulla beatae maxime, officia molestiae cumque repellat
      impedit perferendis commodi placeat nostrum, saepe hic harum facilis
      quidem. Harum vel, quia placeat eum illo, quidem atque quam dicta nostrum
      explicabo aperiam, eveniet officia corrupti nam nulla temporibus. Corrupti
      doloremque eaque ea iusto maxime assumenda, odit sint accusamus ullam
      earum maiores ducimus. Nemo consequuntur quidem nulla? Magnam rerum fugiat
      obcaecati ab doloremque consequatur ratione qui in, nam ipsum eius
      laudantium autem atque rem distinctio tempora quasi sunt, sint sed fugit
      quibusdam!
    </main>
  );
};
