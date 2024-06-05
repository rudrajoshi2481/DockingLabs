export const checkLastLoginHoursAgo = ({ time }: any) => {
  const givenTime:any = new Date(time);
  const currentTime: any = new Date();
  const diffInMilliseconds = currentTime - givenTime;
  const diffInHours = diffInMilliseconds / (1000 * 60 * 60); 

  return Math.round(diffInHours)
};
