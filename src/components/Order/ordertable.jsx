import React from "react";
import { VND } from "../../assets/js/handlePrice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function OrderTable({
  stt,
  id,
  urlThumnail,
  name,
  price,
  discount,
  quality,
  handleMulti,
  handlePlus,
  removeProduct,
}) {
  let pricechange = discount !== 0 ? price - (price * discount) / 100 : price;
  return (
    <>
      <tr>
        <td>{stt}</td>
        <td className="thumnail">
          <img src={urlThumnail} alt="" width={100} />
        </td>
        <td>{name}</td>
        <td>{VND.format(pricechange)}</td>
        <td>{quality}</td>
        <td>
          <button>
            <FontAwesomeIcon icon={faPlus} onClick={(e) => handlePlus(id)} />
          </button>
          <button>
            <FontAwesomeIcon icon={faMinus} onClick={(e) => handleMulti(id)} />
          </button>
          <button>
            <FontAwesomeIcon
              icon={faTrash}
              onClick={(e) => removeProduct(id)}
            />
          </button>
        </td>
        <td>{VND.format(pricechange * quality)}</td>
      </tr>
    </>
  );
}
