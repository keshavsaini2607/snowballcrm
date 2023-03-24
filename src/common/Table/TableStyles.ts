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
      font-weight: 700;
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
      padding: 10px;
      border-bottom: 1px solid #ddd;
      background-color: #fff;
      overflow: hidden;

      :last-child {
        border-right: 0;
      }
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
        box-shadow: 0px 3px 3px #ccc;
      }

      .footer {
        bottom: 0;
        box-shadow: 0px -3px 3px #ccc;
      }

      .body {
        position: relative;
        z-index: 0;
      }

      [data-sticky-td] {
        position: sticky;
      }

      [data-sticky-last-left-td] {
        box-shadow: 2px 0px 3px #ccc;
      }

      [data-sticky-first-right-td] {
        box-shadow: -2px 0px 3px #ccc;
        background-color: #ccc;
      }
    }
  }
`;