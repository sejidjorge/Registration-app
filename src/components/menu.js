
export default function Menu(){
    return(
      <><div className="header" id="header">
        <div className="header_toggle">
          <i className='bx bx-menu' id="header-toggle"></i>
        </div>
      </div>
        <div className="l-navbar" id="nav-bar">
        <div className="nav">
          <div className="nav_list flex-column nav-pills" id="v-pills-tab" role="tablist">
            <a class="nav_link" id="v-pills-home-tab" href="/">
              <i class='bx bx-grid-alt nav_icon'></i>
              <span class="nav_name">Cadastrar</span>
            </a>
            <a class="nav_link" id="v-pills-clientes-tab" href="/clientes">
              <i class='bx bx-user nav_icon'></i>
              <span class="nav_name">Clientes</span>
            </a>
          </div>
        </div>
      </div></>
    );
}
