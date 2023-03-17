<template>
  <!--INDEX NAVBAR WITH NORMAL OPTIONS FOR MAIN PAGE-->
  <nav class="container">
    <div class="nav-wrapper black">
      <a href="#!" class="brand-logo"
        ><font-awesome-icon icon="fa-solid fa-dumbbell" />Gimnasio X</a
      >

      <ul class="right hide-on-med-and-down">
        <li><font-awesome-icon icon="fa-solid fa-home" /></li>
        <li>
          <a href="#"><router-link to="/">Inicio</router-link> </a>
        </li>

        <li><font-awesome-icon icon="fa-solid fa-hammer" /></li>
        <li>
          <a href="#"><router-link to="/admin">Administrar</router-link> </a>
        </li>
        <li><font-awesome-icon icon="fa-solid fa-circle-user" /></li>
        <li>
          <a href="#"><router-link to="/users">Usuarios</router-link> </a>
        </li>

        <li><font-awesome-icon icon="fa-solid fa-scroll" /></li>
        <li>
          <a href="#"><router-link to="/reports">Reportes</router-link> </a>
        </li>
      </ul>
    </div>
  </nav>
</template>
