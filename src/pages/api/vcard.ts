import * as next from "next";
import vCardFactory from "vcards-js";

// TODO: add req.body validation
export default async function handler(
  req: next.NextApiRequest,
  res: next.NextApiResponse
) {
  const vCard = vCardFactory();

  for (const key in req.body as Partial<ReturnType<typeof vCardFactory>>) {
    // TODO: ADD lib patch to fix vCardFactory type
    // @ts-ignore
    vCard[key] = req.body[key];
  }

  return res.status(200).send(vCard.getFormattedString());
}
