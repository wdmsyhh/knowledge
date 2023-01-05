# Session 列表

<ul>
    <li v-for="session in $page.sessions">
        <a :href="session.url" class="" target="_blank">
            {{session.text}}
        </a>
    </li>
</ul>
