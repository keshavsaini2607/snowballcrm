import styled from 'styled-components';

export const Styles = styled.div`
  .table {
    border: 1px solid #ddd;

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }

    table #Selection {
      width: 20px;
    }

    .th {
      font-weight: 900 !important;
      background-color: #000;
    }

    .th, .td {
      border-left: 1px solid #ddd;
    }

    .td {
      width: 300px !important;
    }
    
    .addrec {
      position: sticky;
      left: 0;
      
    }

    .th,
    .td {
      border-bottom: 1px solid #ddd;
      background-color: #fff;
      overflow: hidden;
      overflow: scroll !important;
      

      :last-child {
        border-right: 0;
      }
    }

    

    .td::-webkit-scrollbar {
      display: none;
    }

    &.sticky {
      overflow: scroll;
      .header,
      .footer {
        position: sticky;
        z-index: 1;
        width: max-content !important;
      }

      .header {
        top: 0;
      }

      .footer {
        bottom: 0;
      }

      .body {
        position: relative;
        z-index: 0;
        color: #252229 !important;
      }

      [data-sticky-td] {
        position: sticky;
      }

      [data-sticky-last-left-td] {
        box-shadow: 2px 0px 3px #ccc;
      }

      [data-sticky-first-right-td] {
        background-color: #ccc;
      }
    }

    .th::-webkit-scrollbar {
      display: none !important;
    }


    .td {
      padding: 0 !important;
      display: flex !important;
    }
    

    .main_head  {
      padding: 1px !important;
    }
    .main_head-0{
      padding: 14px 12px !important;
      font-size: 15px !important;
      background-color: #fbf9f7 !important;
      // z-index: 999;

    }

    .main_head-1 {
      padding:4px !important;
      padding-left: 11px !important;
      display: flex !important;
      align-items: center !important;
    }
    .add_head {
      font-size: 15px !important;
    }
  }

  .left-sticky {
    position: sticky;
    left: 0;
    z-index: 1;
    background-color: white;
  }

  .head-0 {
  }
  .td-0 {
    display: flex !important;
    width: 50px !important;
  }
  
`;